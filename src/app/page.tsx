'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Input from "@/components/inputs/input";
import { useEffect, useState } from "react";
import InputHidden from "@/components/inputs/inputHidden";
import Button from "@/components/buttons/Button";
import ButtonLoading from "@/components/buttons/ButtonLoading";
import { authenticate, getToken, login, setToken } from "@/services/api";
import Card from "@/components/cards/Card";
import Tag from "@/components/tags/Tag";
import TitleXL from "@/components/titles/TitleXL";
import toast from "react-hot-toast";
import ToastCustom from "@/components/toast/Toast";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  


  router.push('/auth/login')
  return (
    null
  );
}





