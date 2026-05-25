import { defineType, defineField } from 'sanity'

export const company = defineType({
  name: 'company',
  title: '회사 정보',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '회사명',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: '한 줄 소개',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'description',
      title: '회사 소개',
      type: 'text',
      rows: 5,
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: '주소',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'businessNumber',
      title: '사업자등록번호',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'representative',
      title: '대표자명',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: '로고',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: '대체 텍스트',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: '소셜 링크',
      type: 'object',
      fields: [
        {
          name: 'website',
          title: '웹사이트',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'heroTitle',
      title: '메인 타이틀',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: '메인 부제목',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'philosophy',
      title: '철학',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'values',
      title: '핵심 가치',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: '제목',
              type: 'string',
            },
            {
              name: 'description',
              title: '설명',
              type: 'text',
              rows: 2,
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'logo',
    },
  },
})


