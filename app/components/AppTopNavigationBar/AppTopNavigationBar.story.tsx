import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { AppTopNavigationBar } from "./AppTopNavigationBar"

declare var module

storiesOf("AppTopNavigationBar", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AppTopNavigationBar text="AppTopNavigationBar" />
      </UseCase>
    </Story>
  ))
