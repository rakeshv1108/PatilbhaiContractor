import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { AppCommonButton } from "./app_common_button"

declare var module

storiesOf("AppCommonButton", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AppCommonButton text="AppCommonButton" />
      </UseCase>
    </Story>
  ))
