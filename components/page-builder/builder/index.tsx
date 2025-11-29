
import { Config } from "@measured/puck"
import Root, { RootProps } from "./root";

// Import components and types
import { HeroSliderComponent, HeroProps } from "./components/HeroSliderComponent"
import { VerticalSpace, VerticalSpaceProps } from "./blocks/VerticleSpace";
import { StatisticsComponent, StatisticsProps } from "./components/StatisticSection";
import { Columns, ColumnsProps } from "./blocks/Columns";
import { Text, TextProps } from "./blocks/Text";
import { Container, ContainerProps } from "./blocks/Container";
import { PremiumCourseComponent, PremiumCourseProps } from "./components/PremiumCourseComponent";
import { PopularCourseSliderComponent, PopularCourseSliderProps } from "./components/PopularCourseComponent";
import { WidgetComponent, WidgetComponentProps } from "./components/WidgetComponent";
import { JoinCourseComponent, JoinCourseComponentProps } from "./components/CourseJoinForm";
import { PopularBlogComponent, PopulartBlogComponentProps } from "./components/PopularBlogComp";
import { TestimonialComponent, TestimonialComponentProps } from "./components/Testimonial";
import { CTAOneComponent, CtaOneComponentProps } from "./components/CtaOneComp";
import { MarketingOneComponent, MarketingOneComponentProps } from "./components/MarketingOne";
import { CourseTabsComponent, CourseTabsComponentProps } from "./components/CourseTabsByCategoryComponent";
import { WhyChooseUsComponent, WhyChooseUsComponentProps } from "./components/WhyChooseUs";
import { CourseFeatureComponent, CourseFeatureComponentProps } from "./components/CourseFeatureComponent";
import { Heading, HeadingProps } from "./blocks/Heading";
import { ButtonBlock, ButtonProps } from "./blocks/Button";
import { ImageBlock, ImageProps } from "./blocks/Image";
import { CardBlock, CardProps } from "./blocks/Card";

// Advanced Components
import { ModernHero, ModernHeroProps } from "./advanced/ModernHero";
import { BentoGrid, BentoGridProps } from "./advanced/BentoGrid";
import { FeatureGrid, FeatureGridProps } from "./advanced/FeatureGrid";
import { PricingTable, PricingTableProps } from "./advanced/PricingTable";
import { TestimonialCarousel, TestimonialCarouselProps } from "./advanced/TestimonialCarousel";
import { FAQAccordion, FAQAccordionProps } from "./advanced/FAQAccordion";
import { StatsCounter, StatsCounterProps } from "./advanced/StatsCounter";
import { CTAStrip, CTAStripProps } from "./advanced/CTAStrip";
import { LogoCloud, LogoCloudProps } from "./advanced/LogoCloud";
import { VideoEmbed, VideoEmbedProps } from "./advanced/VideoEmbed";

// Creative Components
import { CreativeHero, CreativeHeroProps } from "./creative/CreativeHero";
import { InfiniteMarquee, InfiniteMarqueeProps } from "./creative/InfiniteMarquee";
import { TiltCard, TiltCardProps } from "./creative/TiltCard";
import { Timeline, TimelineProps } from "./creative/Timeline";
import { SmartButton, SmartButtonProps } from "./creative/SmartButton";


export type Props = {
  HeroSliderComponent: HeroProps,
  VerticalSpace: VerticalSpaceProps;
  StatisticsComponent: StatisticsProps;
  Columns: ColumnsProps;
  Text: TextProps;
  Container: ContainerProps,
  PremiumCourseComponent: PremiumCourseProps,
  PopularCourseSliderComponent: PopularCourseSliderProps,
  WidgetComponent: WidgetComponentProps,
  JoinCourseComponent: JoinCourseComponentProps,
  PopularBlogComponent: PopulartBlogComponentProps,
  TestimonialComponent: TestimonialComponentProps,
  CTAOneComponent: CtaOneComponentProps,
  MarketingOneComponent: MarketingOneComponentProps,
  CourseTabsComponent: CourseTabsComponentProps,
  WhyChooseUsComponent: WhyChooseUsComponentProps,
  CourseFeatureComponent: CourseFeatureComponentProps,
  Heading: HeadingProps,
  ButtonBlock: ButtonProps,
  ImageBlock: ImageProps,
  CardBlock: CardProps,
  // Advanced
  ModernHero: ModernHeroProps,
  BentoGrid: BentoGridProps,
  FeatureGrid: FeatureGridProps,
  PricingTable: PricingTableProps,
  TestimonialCarousel: TestimonialCarouselProps,
  FAQAccordion: FAQAccordionProps,
  StatsCounter: StatsCounterProps,
  CTAStrip: CTAStripProps,
  LogoCloud: LogoCloudProps,
  VideoEmbed: VideoEmbedProps,
  // Creative
  CreativeHero: CreativeHeroProps,
  InfiniteMarquee: InfiniteMarqueeProps,
  TiltCard: TiltCardProps,
  Timeline: TimelineProps,
  SmartButton: SmartButtonProps,
}

export type UserConfig = Config<
  Props,
  RootProps,
  "prebuilt" | "layout" | "widget" | "basic" | "advanced" | "creative"
>;


export const conf: UserConfig = {
  root: {
    defaultProps: {
      title: "My Page",
    },
    render: Root,
  },
  viewports: [
    { width: 1280, height: "auto", label: "Desktop", icon: "Monitor" },
    { width: 768, height: "auto", label: "Tablet", icon: "Tablet" },
    { width: 375, height: "auto", label: "Mobile", icon: "Smartphone" },
  ],
  categories: {
    creative: {
      title: "Creative Components",
      components: [
        'CreativeHero',
        'InfiniteMarquee',
        'TiltCard',
        'Timeline',
        'SmartButton'
      ]
    },
    advanced: {
      title: "Advanced Components",
      components: [
        'ModernHero',
        'BentoGrid',
        'FeatureGrid',
        'PricingTable',
        'TestimonialCarousel',
        'FAQAccordion',
        'StatsCounter',
        'CTAStrip',
        'LogoCloud',
        'VideoEmbed'
      ]
    },
    basic: {
      title: "Building Blocks",
      components: ['Heading', 'Text', 'ButtonBlock', 'ImageBlock', 'CardBlock']
    },
    layout: {
      components: ['VerticalSpace', 'Columns', 'Container']
    },
    prebuilt: {
      components: [
        'HeroSliderComponent',
        'StatisticsComponent',
        'PremiumCourseComponent',
        'PopularCourseSliderComponent',
        'CourseFeatureComponent',
        "WhyChooseUsComponent",
        "CourseTabsComponent",
        "MarketingOneComponent",
        'CTAOneComponent',
        'TestimonialComponent',
        'PopularBlogComponent',
        'JoinCourseComponent'
      ]
    },
    widget: {
      components: ["WidgetComponent"]
    }
  },
  components: {
    HeroSliderComponent,
    VerticalSpace,
    StatisticsComponent,
    Columns,
    Text,
    Container,
    PremiumCourseComponent,
    PopularCourseSliderComponent,
    WidgetComponent,
    CourseFeatureComponent,
    WhyChooseUsComponent,
    CourseTabsComponent,
    MarketingOneComponent,
    CTAOneComponent,
    TestimonialComponent,
    PopularBlogComponent,
    JoinCourseComponent,
    Heading,
    ButtonBlock,
    ImageBlock,
    CardBlock,
    // Advanced
    ModernHero,
    BentoGrid,
    FeatureGrid,
    PricingTable,
    TestimonialCarousel,
    FAQAccordion,
    StatsCounter,
    CTAStrip,
    LogoCloud,
    VideoEmbed,
    // Creative
    CreativeHero,
    InfiniteMarquee,
    TiltCard,
    Timeline,
    SmartButton,
  },
};