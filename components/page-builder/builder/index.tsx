import { Config } from "@measured/puck"
import { HeroProps, HeroSliderComponent } from "./components/HeroSliderComponent"
import Root, { RootProps } from "./root";
import { VerticalSpace, VerticalSpaceProps } from "./blocks/VerticleSpace";
import { StatisticsComponent, StatisticsProps } from "./components/StatisticSection";
import { Columns, ColumnsProps } from "./blocks/Columns";
import { Text, TextProps } from "./blocks/Text";
import { ContainerProps, Container } from "./blocks/Container";
import { PremiumCourseProps, PremiumCourseComponent } from "./components/PremiumCourseComponent";
import { PopularCourseSliderProps, PopularCourseSliderComponent } from "./components/PopularCourseComponent";
import { WidgetComponent, WidgetComponentProps } from "./components/WidgetComponent";
import { JoinCourseComponent, JoinCourseComponentProps } from "./components/CourseJoinForm";
import { PopularBlogComponent, PopulartBlogComponentProps } from "./components/PopularBlogComp";
import { TestimonialComponent, TestimonialComponentProps } from "./components/Testimonial";
import { CTAOneComponent, CtaOneComponentProps } from "./components/CtaOneComp";
import { MarketingOneComponent, MarketingOneComponentProps } from "./components/MarketingOne";
import { CourseTabsComponent, CourseTabsComponentProps } from "./components/CourseTabsByCategoryComponent";
import { WhyChooseUsComponent, WhyChooseUsComponentProps } from "./components/WhyChooseUs";
import { CourseFeatureComponent, CourseFeatureComponentProps } from "./components/CourseFeatureComponent";

import { MarketingHero, MarketingHeroProps } from "./blocks/marketing/MarketingHero";
import { MarketingFeatures, MarketingFeaturesProps } from "./blocks/marketing/MarketingFeatures";
import { MarketingInstructor, MarketingInstructorProps } from "./blocks/marketing/MarketingInstructor";
import { MarketingFAQ, MarketingFAQProps } from "./blocks/marketing/MarketingFAQ";
import { MarketingCTA, MarketingCTAProps } from "./blocks/marketing/MarketingCTA";
import { MarketingEnquiry, MarketingEnquiryProps } from "./blocks/marketing/MarketingEnquiry";
import { MarketingMarquee, MarketingMarqueeProps } from "./blocks/marketing/MarketingMarquee";
import { MarketingCurriculum, MarketingCurriculumProps } from "./blocks/marketing/MarketingCurriculum";


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
  MarketingHero: MarketingHeroProps;
  MarketingFeatures: MarketingFeaturesProps;
  MarketingInstructor: MarketingInstructorProps;
  MarketingFAQ: MarketingFAQProps;
  MarketingCTA: MarketingCTAProps;
  MarketingEnquiry: MarketingEnquiryProps;
  MarketingMarquee: MarketingMarqueeProps;
  MarketingCurriculum: MarketingCurriculumProps;

}

export type UserConfig = Config<
  Props,
  RootProps,
  "prebuilt" | "layout" | "widget" | "marketing"
>;


export const conf: UserConfig = {
  root: {
    defaultProps: {
      title: "My Page",
    },
    render: Root,
  },
  categories: {
    layout: {
      components: ['VerticalSpace', 'Columns', 'Text', 'Container']
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
    },
    marketing: {
      components: [
        'MarketingHero',
        'MarketingFeatures',
        'MarketingCurriculum',
        'MarketingInstructor',
        'MarketingFAQ',
        'MarketingCTA',
        'MarketingEnquiry',
        'MarketingMarquee'
      ]
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
    MarketingHero,
    MarketingFeatures,
    MarketingInstructor,
    MarketingFAQ,
    MarketingCTA,
    MarketingEnquiry,
    MarketingMarquee,
    MarketingCurriculum
  },
};