import next from "next";
import Link from "next/dist/client/link";
import Image from "next/image";

const BlogCard = ({ blog }) => {
  console.log(blog);
  const { title, slug, thumbnail, featuredImage, authors, content } =
    blog.fields;
  return (
    <div className="card">
      <div className="featured">
        <Image
          src={"https:" + thumbnail.fields.file.url}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
        />
      </div>
      <div className="info">
        <h4>{title}</h4>
      </div>
      <div className="actions">
        <Link href={"/blogs/" + slug}>
          <a>read</a>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
