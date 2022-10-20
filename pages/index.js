import { createClient } from "contentful";
import BlogCard from "../components/BlogCard";
export async function getStaticProps() {
  const client = createClient({
    space: "b3yod1bf8v4l",
    accessToken: "dtlzwcHxLhNeVaXpudFOxbLFFBm0FBejw5CAu7DyrE0",
  });

  const res = await client.getEntries({
    content_type: "blog",
  });

  return {
    props: {
      blogs: res.items,
    },
  };
}

export default function Blogs({ blogs }) {
  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <BlogCard key={blog.sys.id} blog={blog} />
      ))}

      <style jsx>
        {`
          .blog-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 20px;
          }
        `}
      </style>
    </div>
  );
}
