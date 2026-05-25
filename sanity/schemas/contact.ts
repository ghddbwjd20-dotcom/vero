import { defineType, defineField } from 'sanity'

export const contact = defineType({
  name: 'contact',
  title: '문의',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '이름',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: '회사명',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: '이메일',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: '전화번호',
      type: 'string',
    }),
    defineField({
      name: 'budget',
      title: '예산',
      type: 'string',
      options: {
        list: [
          { title: '500만원 미만', value: 'under-500' },
          { title: '500만원 - 1,000만원', value: '500-1000' },
          { title: '1,000만원 - 2,000만원', value: '1000-2000' },
          { title: '2,000만원 - 5,000만원', value: '2000-5000' },
          { title: '5,000만원 이상', value: 'over-5000' },
        ],
      },
    }),
    defineField({
      name: 'timeline',
      title: '희망 일정',
      type: 'string',
      options: {
        list: [
          { title: 'ASAP (가능한 빨리)', value: 'asap' },
          { title: '1개월 이내', value: '1-month' },
          { title: '2-3개월', value: '2-3-months' },
          { title: '3-6개월', value: '3-6-months' },
          { title: '유연함', value: 'flexible' },
        ],
      },
    }),
    defineField({
      name: 'requirements',
      title: '요구사항',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'status',
      title: '처리 상태',
      type: 'string',
      options: {
        list: [
          { title: '신규', value: 'new' },
          { title: '처리중', value: 'processing' },
          { title: '완료', value: 'completed' },
          { title: '보류', value: 'pending' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'notes',
      title: '메모',
      type: 'text',
      rows: 3,
      description: '내부 메모용 필드입니다.',
    }),
    defineField({
      name: 'submittedAt',
      title: '제출일',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
  orderings: [
    {
      title: '제출일 (최신순)',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: '제출일 (오래된순)',
      name: 'submittedAtAsc',
      by: [{ field: 'submittedAt', direction: 'asc' }],
    },
    {
      title: '이름 (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})


