import { useState } from 'react'
import { Typography } from '@clovirtualfashion/components'
import {
  Root,
  Hero,
  HeroMeta,
  ToggleRow,
  ToggleGroup,
  ToggleButton,
  SectionGrid,
  Card,
  List,
  BenefitList,
  BenefitCard,
} from './About.styled'

const PAGE_GUIDE = [
  {
    title: 'Library',
    ko: {
      what: 'Library는 원단, 소재, 부자재를 카테고리별로 관리하는 화면입니다. 데이터를 추가하고, 수정하고, 삭제하면서 라이브러리 자산을 정리할 수 있습니다.',
      benefits: [
        '카테고리별로 자산을 체계적으로 관리할 수 있습니다.',
        '검색, 필터, 정렬을 통해 필요한 항목을 빠르게 찾을 수 있습니다.',
        '가격과 기본 속성을 직접 수정하면서 데이터 품질을 유지할 수 있습니다.',
      ],
    },
    en: {
      what: 'Library is the management surface for fabrics, materials, and trims. It helps teams curate item data, maintain pricing, and keep the material base organized by category.',
      benefits: [
        'Keeps the asset library structured and easy to maintain.',
        'Makes search, filtering, and sorting practical at larger data volumes.',
        'Supports direct maintenance of pricing and key material attributes.',
      ],
    },
  },
  {
    title: 'Explorer',
    ko: {
      what: 'Explorer는 소재 특성을 탐색하는 화면입니다. Roughness, Metalness, Opacity 같은 수치를 범위로 조정하면서 원하는 재질 특성을 빠르게 좁힐 수 있습니다.',
      benefits: [
        '수치 기반 탐색으로 원하는 재질을 빠르게 찾을 수 있습니다.',
        '시각적 비교가 쉬워서 머티리얼 후보를 검토하기 좋습니다.',
        '상세 패널로 속성을 한눈에 확인할 수 있습니다.',
      ],
    },
    en: {
      what: 'Explorer is the visual discovery page for material properties. It lets users narrow the material set with roughness, metalness, and opacity ranges and inspect the result set in a more exploratory way.',
      benefits: [
        'Speeds up material discovery through numeric filtering.',
        'Makes visual comparison easier than a plain data table.',
        'Supports quick review of detailed properties in context.',
      ],
    },
  },
  {
    title: 'Costing',
    ko: {
      what: 'Costing은 Article BOM과 원가를 확인하는 화면입니다. BOM row를 추가하거나 삭제하면서 특정 아티클의 총 원가와 구성 요소를 즉시 확인할 수 있습니다.',
      benefits: [
        '아티클 단위의 원가 구조를 빠르게 파악할 수 있습니다.',
        '가장 비싼 BOM row와 평균 비용을 함께 보며 판단할 수 있습니다.',
        'BOM 변경이 총 비용에 주는 영향을 바로 확인할 수 있습니다.',
      ],
    },
    en: {
      what: 'Costing is the article-level cost analysis page. It combines BOM rows with item prices so teams can review total material cost, add rows, remove rows, and inspect row-level cost impact.',
      benefits: [
        'Gives a fast view of article-level cost structure.',
        'Highlights expensive rows and average cost at a glance.',
        'Helps teams understand the cost impact of BOM changes immediately.',
      ],
    },
  },
] as const

const PLATFORM_BENEFITS = [
  {
    title: 'Single Workspace',
    text: 'Library, exploration, and costing live together, so context does not get lost between tasks.',
  },
  {
    title: 'Editable Mock Workflow',
    text: 'The current setup is ideal for prototyping workflows because users can create, update, and delete data directly.',
  },
  {
    title: 'Fast Evaluation',
    text: 'Teams can inspect material options, compare properties, and estimate BOM impact without leaving the workspace.',
  },
] as const

export const About = () => {
  const [language, setLanguage] = useState<'en' | 'ko'>('en')

  return (
    <Root>
      <Hero>
        <Typography typoName="Normal/Headline/3/Bold">About</Typography>
        <HeroMeta>
          {language === 'en'
            ? 'This page explains what each workspace section does, why it matters, and which capabilities are currently available.'
            : '이 페이지는 각 워크스페이스 섹션이 무엇을 하는지, 왜 중요한지, 그리고 현재 어떤 기능을 제공하는지 설명합니다.'}
        </HeroMeta>
      </Hero>

      <ToggleRow>
        <ToggleGroup>
          <ToggleButton type="button" isActive={language === 'en'} onClick={() => setLanguage('en')}>EN</ToggleButton>
          <ToggleButton type="button" isActive={language === 'ko'} onClick={() => setLanguage('ko')}>KO</ToggleButton>
        </ToggleGroup>
      </ToggleRow>

      <BenefitList>
        {PLATFORM_BENEFITS.map((item) => (
          <BenefitCard key={item.title}>
            <Typography typoName="Normal/Body/2/Bold">{item.title}</Typography>
            <Typography typoName="Normal/Body/4/Normal">{item.text}</Typography>
          </BenefitCard>
        ))}
      </BenefitList>

      {PAGE_GUIDE.map((section) => (
        <Card key={section.title}>
          <Typography typoName="Normal/Headline/4/Bold">{section.title}</Typography>
          <SectionGrid>
            <Card>
              <Typography typoName="Normal/Body/3/Bold">{section[language].what}</Typography>
              <List>
                {section[language].benefits.map((item) => <li key={item}>{item}</li>)}
              </List>
            </Card>
          </SectionGrid>
        </Card>
      ))}
    </Root>
  )
}
