"use client"

import {useRouter} from "next/navigation"
import Contents from "@/components/ui/Contents";
import Sidebar from "@/components/ui/Sidebar";
import { Layout } from "antd";
import React, { useEffect } from "react";
import { isLoggedIn } from "@/services/auth.service";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter()
  const userLoggedIn = isLoggedIn()

  useEffect(() =>{
    if(!userLoggedIn){
      router.push("/login")
    }
  },[router])
  return (
    <Layout>
      <Sidebar />
      <Contents>{children}</Contents>
    </Layout>
  );
}
