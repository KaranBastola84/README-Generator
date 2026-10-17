import type { Metadata } from "next";
import Builder from "./Builder";

export const metadata: Metadata = {
  title: "README Builder — GitCraft",
  description:
    "Write your GitHub profile README in the browser and watch the Markdown update as you type.",
};

export default function BuilderPage() {
  return <Builder />;
}
