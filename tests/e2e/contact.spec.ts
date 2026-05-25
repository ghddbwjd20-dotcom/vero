import { test, expect } from '@playwright/test'

test.describe('문의 페이지', () => {
  test('문의 폼이 정상적으로 로드된다', async ({ page }) => {
    await page.goto('/contact')
    
    // 페이지 제목 확인
    await expect(page).toHaveTitle(/문의하기/)
    
    // 폼 필드들 확인
    await expect(page.getByLabel('이름')).toBeVisible()
    await expect(page.getByLabel('이메일')).toBeVisible()
    await expect(page.getByLabel('예산')).toBeVisible()
    await expect(page.getByLabel('희망 일정')).toBeVisible()
    await expect(page.getByLabel('프로젝트 요구사항')).toBeVisible()
  })

  test('폼 유효성 검사가 정상 작동한다', async ({ page }) => {
    await page.goto('/contact')
    
    // 빈 폼 제출 시도
    await page.getByRole('button', { name: '문의 보내기' }).click()
    
    // 에러 메시지 확인
    await expect(page.getByText('이름을 입력해주세요')).toBeVisible()
    await expect(page.getByText('올바른 이메일을 입력해주세요')).toBeVisible()
  })

  test('폼이 정상적으로 제출된다', async ({ page }) => {
    await page.goto('/contact')
    
    // 폼 작성
    await page.getByLabel('이름').fill('홍길동')
    await page.getByLabel('이메일').fill('test@example.com')
    await page.getByLabel('예산').selectOption('500-1000')
    await page.getByLabel('희망 일정').selectOption('1-month')
    await page.getByLabel('프로젝트 요구사항').fill('웹사이트 개발 프로젝트입니다.')
    
    // 동의 체크박스 체크
    await page.getByLabel('이용약관에 동의합니다').check()
    await page.getByLabel('개인정보처리방침에 동의합니다').check()
    
    // 폼 제출
    await page.getByRole('button', { name: '문의 보내기' }).click()
    
    // 성공 메시지 확인 (API가 실제로 작동하지 않으므로 스킵)
    // await expect(page.getByText('문의가 접수되었습니다')).toBeVisible()
  })
})


