import { test, expect } from '@playwright/test'

test.describe('홈페이지', () => {
  test('페이지가 정상적으로 로드된다', async ({ page }) => {
    await page.goto('/')
    
    // 페이지 제목 확인
    await expect(page).toHaveTitle(/베로\(VERO\)/)
    
    // 메인 타이틀 확인
    await expect(page.getByRole('heading', { name: '진정성으로 신뢰를 설계합니다' })).toBeVisible()
    
    // 네비게이션 메뉴 확인
    await expect(page.getByRole('link', { name: '회사 소개' })).toBeVisible()
    await expect(page.getByRole('link', { name: '포트폴리오' })).toBeVisible()
    await expect(page.getByRole('link', { name: '공지사항' })).toBeVisible()
    await expect(page.getByRole('link', { name: '문의' })).toBeVisible()
  })

  test('CTA 버튼이 정상적으로 작동한다', async ({ page }) => {
    await page.goto('/')
    
    // 프로젝트 문의 버튼 클릭
    await page.getByRole('link', { name: '프로젝트 문의' }).first().click()
    
    // 문의 페이지로 이동 확인
    await expect(page).toHaveURL('/contact')
  })

  test('모바일에서 반응형이 정상 작동한다', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // 모바일 메뉴 버튼 확인
    await expect(page.getByRole('button', { name: '메뉴 열기' })).toBeVisible()
    
    // 모바일 메뉴 열기
    await page.getByRole('button', { name: '메뉴 열기' }).click()
    
    // 모바일 메뉴 항목들 확인
    await expect(page.getByRole('link', { name: '회사 소개' })).toBeVisible()
    await expect(page.getByRole('link', { name: '포트폴리오' })).toBeVisible()
  })
})


