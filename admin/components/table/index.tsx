import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { FC } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";

interface Props{
  columns: { name: string; uid: string}[] 
  url: string
}

const TableInfo: FC<Props>= ( {columns, url} ) => {

  const router = useRouter();
  const onClick = () => {
      router.push(url);
  }

      const users = [
        {
          id: 1,
          name: "Alejandro Molina",
          role: "CEO",
          team: "Management",
          status: "active",
          age: "29",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          email: "tony.reichert@example.com",
          rif: "V-028155389",
          tlf: "414-1115826"
        },
        {
          id: 2,
          name: "Zoey Lang",
          role: "Technical Lead",
          team: "Development",
          status: "paused",
          age: "25",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
          email: "zoey.lang@example.com",
        },
        {
          id: 3,
          name: "Jane Fisher",
          role: "Senior Developer",
          team: "Development",
          status: "active",
          age: "22",
          avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          email: "jane.fisher@example.com",
        },
        {
          id: 4,
          name: "William Howard",
          role: "Community Manager",
          team: "Marketing",
          status: "vacation",
          age: "28",
          avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
          email: "william.howard@example.com",
        },
        {
          id: 5,
          name: "Kristen Copper",
          role: "Sales Manager",
          team: "Sales",
          status: "active",
          age: "24",
          avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
          email: "kristen.cooper@example.com",
        },
      ];

      const renderCell = (user: any, columnKey: string) => {
        const cellValue = user[columnKey as keyof typeof user];
        switch (columnKey) {
          case "logo":
            return (
              <User squared src={user.avatar} name={cellValue} css={{ p: 0 }}>
              </User>
            );
          case "name":
            return (
              // <User name={cellValue} css={{ p: 0 }}>
              //   {user.email}
              // </User>
              <Text>
                {user.name}
              </Text>
            );
          case "role":
            return (
              <Col>
                <Row>
                  <Text b size={14} css={{ tt: "capitalize" }}>
                    {cellValue}
                  </Text>
                </Row>
                <Row>
                  <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                    {user.team}
                  </Text>
                </Row>
              </Col>
            );
          case "status":
            return <StyledBadge type={user.status}>{cellValue}</StyledBadge>;
    
          case "actions":
            // url+`${user.id}`
            return (
              <Row justify="center" align="center">
                <Col css={{ d: "flex" }}>
                  <Tooltip content="Details">
                    <NextLink href = {url} passHref > 
                      <IconButton onClick={ () => console.log("Edit user", user.id) } >
                        <EyeIcon height = {20} width={ 20} size={20} fill="#979797" />
                      </IconButton>
                    </NextLink>
                  </Tooltip>
                </Col>
                <Col css={{ d: "flex" }}>
                  <Tooltip content="Edit user">
                    <IconButton onClick={() => console.log("Edit user", user.id)}>
                      <EditIcon height = {20} width={ 20} size={20} fill="#979797" />
                    </IconButton>
                  </Tooltip>
                </Col>
                <Col css={{ d: "flex" }}>
                  <Tooltip
                    content="Delete user"
                    color="error" 
                    onClick={() => console.log("Delete user", user.id)}
                  >
                    <IconButton>
                      <DeleteIcon height = {20} width={ 20} size={20} fill="#FF0080" />
                    </IconButton>
                  </Tooltip>
                </Col>
              </Row>
            );
          default:
            return cellValue;
        }
      };

  return (
    <Table
      aria-label="Example table with custom cells"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      selectionMode="none"
    >
      <Table.Header columns ={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={users}>
        {(item) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{ renderCell(item, columnKey as string) }</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
      <Table.Pagination
        shadow
        noMargin
        align="center"
        rowsPerPage={5}
        onPageChange={(page) => console.log({ page })}
      />
    </Table>
  )
}

export default TableInfo