import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';

// Collection references
const usersCollection = collection(db, 'users');
const postsCollection = collection(db, 'posts');
const commentsCollection = collection(db, 'comments');

// User operations
export const userService = {
  // Create a new user document
  createUser: async (userData) => {
    try {
      const userRef = doc(usersCollection, userData.uid);
      await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { ...userData, id: userData.uid };
    } catch (error) {
      console.error('Error creating user document:', error);
      throw error;
    }
  },

  // Get a user by ID
  getUserById: async (uid) => {
    try {
      const userRef = doc(usersCollection, uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return { id: userSnap.id, ...userSnap.data() };
      } else {
        console.log('No such user!');
        return null;
      }
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  // Update a user
  updateUser: async (uid, userData) => {
    try {
      const userRef = doc(usersCollection, uid);
      await updateDoc(userRef, {
        ...userData,
        updatedAt: serverTimestamp()
      });
      return { id: uid, ...userData };
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Delete a user
  deleteUser: async (uid) => {
    try {
      const userRef = doc(usersCollection, uid);
      await deleteDoc(userRef);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
};

// Post operations
export const postService = {
  // Create a new post
  createPost: async (postData) => {
    try {
      const docRef = await addDoc(postsCollection, {
        ...postData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...postData };
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  // Get a post by ID
  getPostById: async (postId) => {
    try {
      const postRef = doc(postsCollection, postId);
      const postSnap = await getDoc(postRef);
      
      if (postSnap.exists()) {
        return { id: postSnap.id, ...postSnap.data() };
      } else {
        console.log('No such post!');
        return null;
      }
    } catch (error) {
      console.error('Error getting post:', error);
      throw error;
    }
  },

  // Get all posts
  getAllPosts: async () => {
    try {
      const q = query(postsCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting posts:', error);
      throw error;
    }
  },

  // Get posts by user
  getPostsByUser: async (userId) => {
    try {
      const q = query(
        postsCollection, 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting user posts:', error);
      throw error;
    }
  },

  // Update a post
  updatePost: async (postId, postData) => {
    try {
      const postRef = doc(postsCollection, postId);
      await updateDoc(postRef, {
        ...postData,
        updatedAt: serverTimestamp()
      });
      return { id: postId, ...postData };
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },

  // Delete a post
  deletePost: async (postId) => {
    try {
      const postRef = doc(postsCollection, postId);
      await deleteDoc(postRef);
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }
};

// Comment operations
export const commentService = {
  // Create a new comment
  createComment: async (commentData) => {
    try {
      const docRef = await addDoc(commentsCollection, {
        ...commentData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...commentData };
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  },

  // Get comments by post
  getCommentsByPost: async (postId) => {
    try {
      const q = query(
        commentsCollection, 
        where('postId', '==', postId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting post comments:', error);
      throw error;
    }
  },

  // Update a comment
  updateComment: async (commentId, commentData) => {
    try {
      const commentRef = doc(commentsCollection, commentId);
      await updateDoc(commentRef, {
        ...commentData,
        updatedAt: serverTimestamp()
      });
      return { id: commentId, ...commentData };
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  },

  // Delete a comment
  deleteComment: async (commentId) => {
    try {
      const commentRef = doc(commentsCollection, commentId);
      await deleteDoc(commentRef);
      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
};

// Helper function to convert Firestore timestamps to JavaScript Date objects
export const convertTimestamp = (timestamp) => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  return timestamp;
};

// Helper function to convert Firestore document to plain object
export const convertDoc = (doc) => {
  if (!doc) return null;
  
  const data = doc.data();
  const result = { id: doc.id };
  
  // Convert timestamps to dates
  Object.keys(data).forEach(key => {
    if (data[key] instanceof Timestamp) {
      result[key] = data[key].toDate();
    } else {
      result[key] = data[key];
    }
  });
  
  return result;
}; 