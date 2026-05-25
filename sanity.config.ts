import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'vero-website',
  title: '베로(VERO) 웹사이트',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('콘텐츠')
          .items([
            S.listItem()
              .title('포트폴리오')
              .child(S.documentTypeList('portfolio').title('포트폴리오')),
            S.listItem()
              .title('공지사항')
              .child(S.documentTypeList('news').title('공지사항')),
            S.listItem()
              .title('문의')
              .child(S.documentTypeList('contact').title('문의')),
            S.listItem()
              .title('회사 정보')
              .child(S.documentTypeList('company').title('회사 정보')),
            ...S.documentTypeListItems().filter(
              (listItem) => !['portfolio', 'news', 'contact', 'company'].includes(listItem.getId()!)
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})


