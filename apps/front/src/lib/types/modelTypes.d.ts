export type User = {
  id: number;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  posts?: Post[];
  comments?: Comment[];
  likes?: Like[];
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  author: User;
  content?: string;
  thumbnail?: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  comments?: Comment[];
  tags?: Tag[];
  likes?: Like[];
  _count: {
    likes: number;
    comments:  number;
  }
};

export type CommentEntity = {
  id: number;
  content: string;
  postId: number;
  post: Post;
  authorId: number;
  author: User;
  createdAt: Date;
  updatedAt: Date;
};

export type Tag = {
  id: number;
  name: string;
  posts?: Post[];
};

export type Like = {
  id: number;
  userId: number;
  user: User;
  postId: number;
  post: Post;
  createdAt: Date;
};
