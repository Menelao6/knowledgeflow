"use client";

import Navbar from "../components/layout/navbar";
import PageContainer from "../components/layout/PageContainer";
import UploadForm from "../components/forms/UploadForm";
import styles from "./upload.module.css";

export default function UploadPage() {
  return (
    <>
      <Navbar />
      <PageContainer className={styles.uploadPage}>
        <UploadForm />
      </PageContainer>
    </>
  );
}