import { defineType, defineField } from 'sanity'

export const portfolio = defineType({
  name: 'portfolio',
  title: '포트폴리오',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '프로젝트명',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: '슬러그',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '한 줄 설명',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'category',
      title: '카테고리',
      type: 'string',
      options: {
        list: [
          { title: '브랜딩', value: 'branding' },
          { title: '커머스', value: 'ecommerce' },
          { title: 'B2B', value: 'b2b' },
          { title: '모바일', value: 'mobile' },
          { title: '웹사이트', value: 'website' },
          { title: '기타', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: '태그',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'year',
      title: '완료 연도',
      type: 'number',
      validation: (Rule) => Rule.required().min(2020).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: 'thumbnail',
      title: '썸네일',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: '갤러리',
      type: 'array',
      of: [
        {
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
            {
              name: 'caption',
              title: '캡션',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'problem',
      title: '문제점',
      type: 'text',
      rows: 3,
      description: '프로젝트에서 해결하려는 문제점을 설명해주세요.',
    }),
    defineField({
      name: 'solution',
      title: '해결방안',
      type: 'text',
      rows: 3,
      description: '문제를 어떻게 해결했는지 설명해주세요.',
    }),
    defineField({
      name: 'results',
      title: '성과',
      type: 'text',
      rows: 3,
      description: '프로젝트 결과와 성과를 설명해주세요.',
    }),
    defineField({
      name: 'techStack',
      title: '기술 스택',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'role',
      title: '담당 역할',
      type: 'text',
      rows: 2,
      description: '프로젝트에서 담당한 역할과 범위를 설명해주세요.',
    }),
    defineField({
      name: 'liveUrl',
      title: '라이브 URL',
      type: 'url',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'publishedAt',
      title: '게시일',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'thumbnail',
    },
  },
  orderings: [
    {
      title: '게시일 (최신순)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: '게시일 (오래된순)',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: '제목 (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})


