import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

const client = createClient({
  space: "b3yod1bf8v4l",
  accessToken: "dtlzwcHxLhNeVaXpudFOxbLFFBm0FBejw5CAu7DyrE0",
});

export async function getStaticPaths() {
  const res = await client.getEntries({
    content_type: "blog",
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "blog",
    "fields.slug": params.slug,
  });

  return {
    props: { blog: items[0] },
  };
}
export default function BlogContent({ blog }) {
  const { title, slug, thumbnail, featuredImage, authors, content } =
    blog.fields;
  return (
    <div>
      <div className="banner">
        <Image
          src={"https:" + featuredImage.fields.file.url}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
        />
        <h2>{title}</h2>
      </div>
      <h3>Authors:</h3>
      {authors.map((author) => {
        <span key={author}>
          {author}
          <br />
        </span>;
      })}
      <div>{documentToReactComponents(content)}</div>
    </div>
  );
}
