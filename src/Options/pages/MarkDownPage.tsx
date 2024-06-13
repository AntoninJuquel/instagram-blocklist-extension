import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import MarkDown from "react-markdown";
import rehypeParse from "rehype-raw";
import * as Typography from "@/components/ui/typography";

interface MarkDownPageProps {
  title: string;
  url: string;
}

export default function MarkDownPage({ title, url }: MarkDownPageProps) {
  const [markdown, setMarkdown] = useState<string>("");
  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then(setMarkdown);
  }, [url]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="[&_img]:inline [&_a]:text-link [&_a]:underline">
        <MarkDown
          rehypePlugins={[rehypeParse]}
          components={{
            h1: Typography.H1,
            h2: Typography.H2,
            h3: Typography.H3,
            h4: Typography.H4,
            p: Typography.P,
            ul: Typography.Ul,
            code: Typography.Code,
          }}
        >
          {markdown}
        </MarkDown>
      </CardContent>
    </Card>
  );
}
