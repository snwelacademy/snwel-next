'use client'

import { Config } from "@measured/puck"
import { HeroProps, HeroSliderComponent } from "./components/HeroSliderComponent"
import Root, { RootProps } from "./root";
import {VerticalSpace, VerticalSpaceProps } from "./blocks/VerticleSpace";
import { StatisticsComponent,StatisticsProps } from "./components/StatisticSection";
import {Columns, ColumnsProps } from "./blocks/Columns";
import { Text, TextProps } from "./blocks/Text";
import { ContainerProps, Container } from "./blocks/Container";
import { PremiumCourseProps, PremiumCourseComponent } from "./components/PremiumCourseComponent";
import { PopularCourseSliderProps, PopularCourseSliderComponent } from "./components/PopularCourseComponent";


export type Props = {
    HeroSliderComponent: HeroProps,
    VerticalSpace: VerticalSpaceProps;
    StatisticsComponent: StatisticsProps;
    Columns: ColumnsProps;
    Text: TextProps;
    Container: ContainerProps,
    PremiumCourseComponent: PremiumCourseProps,
    PopularCourseSliderComponent: PopularCourseSliderProps
}

export type UserConfig = Config<
Props,
RootProps,
"prebuilt"|"layout" 
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
        components: ['HeroSliderComponent', 'StatisticsComponent', 'PremiumCourseComponent', 'PopularCourseSliderComponent']
      },
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
    },
  };