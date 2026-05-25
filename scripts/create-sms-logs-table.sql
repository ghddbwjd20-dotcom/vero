-- SMS 전송 로그 테이블 생성
CREATE TABLE IF NOT EXISTS sms_logs (
    id SERIAL PRIMARY KEY,
    inquiry_id INTEGER REFERENCES contacts(id) ON DELETE SET NULL,
    phone_number VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    service VARCHAR(20) NOT NULL, -- twilio, naver, aws, none
    message_id VARCHAR(100), -- SMS 서비스에서 제공하는 메시지 ID
    status VARCHAR(20) NOT NULL, -- success, failed, pending
    error_message TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_sms_logs_inquiry_id ON sms_logs(inquiry_id);
CREATE INDEX IF NOT EXISTS idx_sms_logs_phone_number ON sms_logs(phone_number);
CREATE INDEX IF NOT EXISTS idx_sms_logs_status ON sms_logs(status);
CREATE INDEX IF NOT EXISTS idx_sms_logs_sent_at ON sms_logs(sent_at);

-- 완료 메시지
SELECT 'SMS 로그 테이블 생성 완료!' as status;

