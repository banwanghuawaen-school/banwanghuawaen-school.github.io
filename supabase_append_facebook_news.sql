-- ==============================================================================
-- ฟังก์ชันสำหรับรับโพสต์จาก Facebook Page ผ่าน Make.com เข้า Supabase โดยอัตโนมัติ
-- ใช้งานร่วมกับตาราง school_portal_data
-- ==============================================================================

CREATE OR REPLACE FUNCTION append_facebook_news(
    p_id TEXT,
    p_message TEXT DEFAULT '',
    p_created_time TEXT DEFAULT '',
    p_image_url TEXT DEFAULT '',
    p_permalink TEXT DEFAULT ''
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    current_news JSONB;
    new_item JSONB;
    v_title TEXT;
    v_subtitle TEXT;
    v_content TEXT;
    v_date TEXT;
    v_lines TEXT[];
BEGIN
    -- 1. ดึงชุดข่าวเดิมทั้งหมดจากตาราง school_portal_data
    SELECT value INTO current_news 
    FROM school_portal_data 
    WHERE key = 'news';

    -- หากยังไม่มีข้อมูลข่าว ให้เริ่มด้วย Array เปล่า
    IF current_news IS NULL THEN
        current_news := '[]'::JSONB;
    END IF;

    -- 2. ตรวจสอบว่าข่าวรหัส (ID) นี้เคยมีในระบบแล้วหรือไม่ เพื่อป้องกันการบันทึกซ้ำ
    IF EXISTS (
        SELECT 1 
        FROM jsonb_array_elements(current_news) AS elem 
        WHERE elem->>'id' = p_id
    ) THEN
        RETURN jsonb_build_object(
            'success', true, 
            'action', 'skipped', 
            'message', 'โพสต์นี้ถูกบันทึกในระบบเรียบร้อยแล้ว (ไม่บันทึกซ้ำ)', 
            'id', p_id
        );
    END IF;

    -- 3. แยกหัวข้อ (Title), คำโปรย (Subtitle) และเนื้อหา (Content)
    v_content := COALESCE(p_message, '');
    
    IF length(trim(v_content)) > 0 THEN
        -- แยกเนื้อหาบรรทัดแรกมาตั้งเป็นหัวข้อข่าว
        v_lines := string_to_array(v_content, E'\n');
        v_title := trim(v_lines[1]);
        
        -- ควบคุมความยาวหัวข้อไม่ให้ยาวเกินไป
        IF length(v_title) > 120 THEN
            v_title := substring(v_title FROM 1 FOR 117) || '...';
        END IF;
        
        -- ใช้บรรทัดที่สอง หรือข้อความเริ่มต้นเป็นคำโปรย
        IF array_length(v_lines, 1) > 1 AND length(trim(v_lines[2])) > 0 THEN
            v_subtitle := trim(v_lines[2]);
            IF length(v_subtitle) > 150 THEN
                v_subtitle := substring(v_subtitle FROM 1 FOR 147) || '...';
            END IF;
        ELSE
            v_subtitle := substring(v_content FROM 1 FOR 140);
        END IF;
    ELSE
        -- กรณีโพสต์มีเฉพาะรูปภาพ ไม่มีข้อความ
        v_title := 'ภาพกิจกรรม โรงเรียนบ้านวังหัวแหวนพัฒนา';
        v_subtitle := 'กิจกรรมและการดำเนินงานของโรงเรียน';
        v_content := 'ติดตามรายละเอียดกิจกรรมเพิ่มเติมได้ที่หน้าเพจ Facebook ของโรงเรียน';
    END IF;

    -- 4. จัดรูปแบบวันที่ YYYY-MM-DD
    IF length(p_created_time) >= 10 THEN
        v_date := substring(p_created_time FROM 1 FOR 10);
    ELSE
        v_date := to_char(now() AT TIME ZONE 'Asia/Bangkok', 'YYYY-MM-DD');
    END IF;

    -- 5. สร้าง Object ข่าวใหม่ตามโครงสร้างของเว็บโรงเรียน
    new_item := jsonb_build_object(
        'id', p_id,
        'title', v_title,
        'subtitle', v_subtitle,
        'content', v_content,
        'date', v_date,
        'category', 'activity',
        'imageUrl', COALESCE(p_image_url, ''),
        'author', 'เพจโรงเรียนบ้านวังหัวแหวนพัฒนา',
        'isPinned', false,
        'status', 'published',
        'views', 0,
        'attachmentName', '',
        'attachmentUrl', '',
        'galleryUrls', '',
        'fbUrl', COALESCE(p_permalink, '')
    );

    -- 6. นำข่าวใหม่ไปไว้บนสุดของข่าวทั้งหมด (index 0)
    current_news := jsonb_build_array(new_item) || current_news;

    -- 7. บันทึกกลับเข้าตาราง school_portal_data
    UPDATE school_portal_data
    SET value = current_news, updated_at = now()
    WHERE key = 'news';

    RETURN jsonb_build_object(
        'success', true, 
        'action', 'inserted', 
        'message', 'เพิ่มข่าวจาก Facebook สำเร็จ', 
        'item', new_item
    );
END;
$$;

-- ให้สิทธิ์ Anon Key เรียกใช้งาน RPC Function นี้ได้ผ่าน REST API
GRANT EXECUTE ON FUNCTION append_facebook_news TO anon, authenticated;
