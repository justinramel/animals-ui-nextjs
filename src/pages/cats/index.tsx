import Head from "next/head"
import { Cat } from "@/domain/cat"
import {Col, Row, Table} from "react-bootstrap"
import { CatsService } from "@/services/api/cats-service"
import Link from "next/link"
import { Filter } from "@/components/Filter"

const service = new CatsService()

export default function CatsPage({ cats } : any) {
  return (
    <>
      <Head>
        <title>View your cats</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>View your cats</h1>

        <Row className="justify-content-between">
          <Col xs="auto">
            <Link href="/cats/new" className="btn btn-primary mb-3">
              Register Cat
            </Link>
          </Col>
          <Col xs="auto">
            <Filter />
          </Col>
        </Row>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cats?.length > 0 &&             
              cats.map((c: Cat) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.description}</td>
                  <td>
                    <Link href={`/cats/${c.id}`} className="btn btn-primary btn-auth0-cta btn-padded">
                      View
                    </Link>
                  </td>
                </tr>                
              ))}
          </tbody>
        </Table>
      </main>
    </>
  )
}

export async function getServerSideProps(context: any) {
  try {
    const queryString = new URLSearchParams(context?.query)
    const name = queryString.get("name") ?? "";
    const description = queryString.get("description") ?? "";

    const cats = await service.all({name, description})
    return { props: { cats } }
  } catch (err) {
    console.log(err)
    return { notFound: true }
  }
}
