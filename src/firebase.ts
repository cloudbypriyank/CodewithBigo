import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqXVh2Gym8drGJvJ_QouIKZiN2cbQgCBc",
  authDomain: "starry-marker-fwjkk.firebaseapp.com",
  projectId: "starry-marker-fwjkk",
  storageBucket: "starry-marker-fwjkk.firebasestorage.app",
  messagingSenderId: "427578422566",
  appId: "1:427578422566:web:be03e542beac4f7b88fde7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-algorithmandcode-456d271e-9837-4869-9d05-c45fecc833df");

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

