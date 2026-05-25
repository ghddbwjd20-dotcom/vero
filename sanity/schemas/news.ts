import { defineType, defineField } from 'sanity'

export const news = defineType({
  name: 'news',
  title: '공지사항',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '제목',
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
      name: 'content',
      title: '본문',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
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
      name: 'category',
      title: '카테고리',
      type: 'string',
      options: {
        list: [
          { title: '업데이트', value: 'update' },
          { title: '프로젝트', value: 'project' },
          { title: '채용', value: 'hiring' },
          { title: '인사이트', value: 'insight' },
          { title: '케이스 스터디', value: 'casestudy' },
          { title: '공지', value: 'notice' },
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
    }),
    defineField({
      name: 'excerpt',
      title: '요약',
      type: 'text',
      rows: 3,
      description: '공지사항의 간단한 요약을 작성해주세요.',
    }),
    defineField({
      name: 'publishedAt',
      title: '게시일',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: '수정일',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      title: '주요 공지',
      type: 'boolean',
      description: '메인 페이지에 표시할 주요 공지사항인지 선택하세요.',
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


