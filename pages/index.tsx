import Header from "@/Components/Header";
import Form from "@/Components/Form";
import PostFeed from "@/Components/posts/PostFeed";
export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening ?" />
      <PostFeed />
    </>
  );
}
