
-- Drop and recreate the admin_dashboard_data view to fix the joins
DROP VIEW IF EXISTS public.admin_dashboard_data;

CREATE VIEW public.admin_dashboard_data AS
SELECT DISTINCT ON (qr.user_session_id)
    qr.user_session_id,
    qr.ip_address,
    qr.started_at,
    qr.last_activity_at,
    qr.session_status,
    qr.user_name,
    qr.user_email,
    qr.last_question_id,
    qr.completion_time_seconds,
    COALESCE(o.plan_type, '') as purchased_plan,
    COALESCE(o.amount, 0) as purchase_amount,
    COALESCE(o.status, '') as payment_status,
    o.created_at as purchase_date,
    COUNT(qr.question_id) as questions_answered
FROM quiz_responses qr
LEFT JOIN orders o ON o.quiz_session_id = qr.user_session_id
GROUP BY 
    qr.user_session_id,
    qr.ip_address,
    qr.started_at,
    qr.last_activity_at,
    qr.session_status,
    qr.user_name,
    qr.user_email,
    qr.last_question_id,
    qr.completion_time_seconds,
    o.plan_type,
    o.amount,
    o.status,
    o.created_at
ORDER BY qr.user_session_id, qr.started_at DESC;
