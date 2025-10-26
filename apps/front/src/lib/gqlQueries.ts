import gql from "graphql-tag";

export const GET_POSTS = gql`
    query posts($skip:Float, $take:Float){
        posts(skip: $skip , take: $take){
        id
        title
        thumbnail
        content
        createdAt
        slug
         author{
                name
            }
            tags{
                id
                name
            } 
        }
        postCount
    }
`;

export const GET_POST_BY_ID = gql`
    query getPostbyId($id:Int!){
        getPostbyId(id:$id){
            id
            title
            thumbnail
            content
            createdAt
            published
            author{
                id
                name
                avatar
            }
            tags{
                id
                name
            }    
        }
    }
`;

export const CREATE_USER_MUTATION = gql`
    mutation createUser($input : CreateUserInput!){
        createUser(createUserInput: $input){
        id
        }
    }
`


export const SIGN_IN_MUTATION = gql`
    mutation signIn($input : SignInInput!){
        signIn(signInInput: $input){
        id
        name
        avatar
        accessToken
        }
    }
`

export const GET_POST_COMMENTS = gql`
    query getPostComments( $postId: Int! ,$take: Int, $skip : Int){
        getPostComments(postId: $postId , take : $take , skip:$skip){
            id
            content
            createdAt
            author{
                id
                name
                avatar
            }
        }
        postCommentCount(postId: $postId)
    }
`

export const CREATE_COMMENT_MUTATION = gql`
     mutation createComment($input : CreateCommentInput!){
        createComment(createCommentInput: $input){
            id        
        }
    }
`
export const POST_LIKES = gql`
    query PostLikeData($postId: Int!){
        postLikesCount(postId: $postId)
        userLikePost(postId: $postId)
    }
`
export const LIKE_POST_MUTATION = gql`
    mutation LikePost( $postId: Int!){
        likePost(postId : $postId)
    }
`
export const UNLIKE_POST_MUTATION = gql`
    mutation UnLikePost( $postId: Int!){
        unlikePost(postId : $postId)
    }
`
export const GET_USER_POSTS = gql`
    query getUserPosts($skip: Float , $take:Float){
        getUserPosts(skip:$skip , take:$take){
            id
            title
            slug
            thumbnail
            published
            createdAt
            content
            _count{
                likes
                comments
            }
        }
        userPostCount

    }
`
export const CREATE_POST_MUTATION = gql`
    mutation createPost($input: CreatePostInput!){
        createPost(createPostInput: $input){
            id
        }
    }
`

export const UPDATE_POST_MUTATION = gql`
    mutation updatePost($input: UpdatePostInput!){
        updatePost(updatePostInput: $input){
            id
        }
    }
`

export const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: Int!){
        deletePost(postId: $postId)
    }
`

export const USER_LIKED_POSTS = gql`
   query LikedPosts {
    LikedPosts {
        id
        post{
            id
            title
            thumbnail
        }
        createdAt
    }
}

`

export const GET_RELEATED_POSTS = gql`
   query GetReleatedPost($postId: Int!) {
    getReleatedPost(postId:$postId) {
        id
        slug
        title        
        thumbnail 
     
    }
}
`

export const GET_ALL_POSTS = gql`
query GetAllPosts($pagination: PaginationInput, $search: String, $tags: [String!]) {
  getAllPosts(pagination: $pagination, search: $search, tags: $tags) {
    id
    title
    thumbnail
    slug
    content
    createdAt
    author {
      name
      avatar
    }
    tags {
      name
    }
  }
}
`

export const GET_ALL_TAGS = gql`
    query GetTopTags {
        getTopTags {
            id
            name
        }
}
`

export const UPDATE_COMMENT_MUTATION = gql`
  mutation updateComment($input: UpdateCommentInput!){
    updateComment(updateCommentInput: $input){
        id        
    }
} 
`

export const DELETE_COMMENT_MUTATION = gql`
mutation deletePost($commentId: Int!) {    
    deleteComment(commentId: $commentId)
}
`

export const SUGGESTED_USER_QUERY = gql`
query SuggestedUsers($query: String) {
    suggestedUsers(query :$query) {
        id
        name      
        bio
        avatar
    }
}

`

export const GET_USER_QUERY = gql`
query getUserDetails($UserId : Int!) {
    getUserDetails(UserId: $UserId) {
        id
        name
        email
        bio
        avatar
        posts{
            id
            title
            createdAt
            thumbnail
            slug
            author{
                id
                name
                avatar
            }
        }
    }    
}
`

export const ADD_FOLLOWER_MUTATION = gql`
mutation addFollower($followerId: Int!) {
    addFollower(followerId: $followerId)
}
`

export const REMOVE_FOLLOWER_MUTATION = gql`
mutation removeFollower($followerId: Int!) {
    removeFollower(followerId: $followerId)
}
`
export const IS_FOLLOWING_QUERY = gql`
query isFollowing($followerId: Int!) {
    isFollowing(followerId: $followerId)
}
`

export const FOLLOWING_POSTS_QUERY = gql`
query FollowingPosts($skip: Float, $take: Float) {
    followingPosts( skip: $skip , take: $take) {
        id
        slug
        title
              thumbnail
        
        createdAt
        author{
            name
        }        
    }
}
`

export const UPDATE_USER_MUTATION = gql`
mutation UpdateUser($input : UpdateUserInput!) {
    UpdateUser(updateUserInput: $input) {
        id
        name
        email
        bio
        avatar
    }
}
`

