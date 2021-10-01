import { getNextStaticProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header } from "components";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function Page() {
  const { query = {} } = useRouter();
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const teammembers = useQuery().teamMembers();

  if (useQuery().$state.isLoading) {
    return null;
  }

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {generalSettings.title} - {generalSettings.description}
        </title>
      </Head>

      <main className="content content-index">
        {teammembers.nodes?.map((teammember) => {
          return (
            <div key={teammember.id ?? ""}>
              <h2>{teammember.name}</h2>
              <p>{teammember.role}</p>
            </div>
          );
        })}
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
