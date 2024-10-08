import type {Metadata} from "next";
import {Inter} from "next/font/google";
import 'antd/dist/reset.css';
import "@/styles/globals.css";
import ContextProvider from "@/app/context/contextProvider";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import {ConfigProvider} from "antd";
import StoreProvider from "@/components/storeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LexPulse",
  description: "Generated by create next app",
};

const theme = {
  token: {
    colorPrimary: "#584cf4",
    colorInfo: "#584cf4",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

    <body className={'w-screen min-h-screen'}>
    <StoreProvider>
      <AntdRegistry>
        <ConfigProvider theme={theme}><ContextProvider>{children}</ContextProvider></ConfigProvider>
      </AntdRegistry>
    </StoreProvider>

    </body>
    </html>
  );
}
