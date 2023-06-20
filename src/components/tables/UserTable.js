import { Text, ActionIcon, Group } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { Component, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import axios from '../../config/axios';

const PAGE_SIZE = 10;
// KANKA BUNUN SHOW VE STOCK SIKINTILI
export default function UserTable(props) {
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("/users/list")
            let users = res.data
            users.map((user) => {
                user.role = user.role === 0 ? 'Employee' : 'Accountant'
            })
            users.sort(function(a, b) {
                var keyA = new Date(a.createdAt),
                  keyB = new Date(b.createdAt);
                // Compare the 2 dates
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
              });
            if (res)
                setRecords(users.slice(0, PAGE_SIZE))
        }
        fetchData();
    }, []);

    useEffect(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        setRecords(records.slice(from, to));
      }, [page]);

    const destroy = async (id) => {
        const data = {
            id: String(id)
        }
        const res = await axios.put("/users/delete",data)
        if (res)
            window.location.href = "/"
    }


    return (
        <DataTable className='w-full'
            minHeight={180}
            noRecordsText="No records to show"
            withBorder
            borderRadius="sm"
            withColumnBorders
            striped
            highlightOnHover
            horizontalSpacing="lg"
            // provide data
            records={records}
            // define columns
            columns={[
            {
                accessor: 'id',
                // this column has a custom title
                title: '#',
                // right-align column
                textAlignment: 'center',
                width: 75
            },
            { 
                accessor: 'fullName',
                title: 'Full Name',
                textAlignment: 'center'
            },
            {
                accessor: 'username',
                title: 'Username',
                textAlignment: 'center'
            },
            {
                accessor: 'email',
                title: 'Mail',
                textAlignment: 'center'
            },
            {
                accessor: 'role',
                title: 'Role',
                textAlignment: 'center'
            },
            {
                accessor: 'actions',
                title: <Text mr="xs">Row actions</Text>,
                textAlignment: 'center',
                width: 150,
                render: (user) => (
                    <Group spacing={4} position="center" noWrap>
                        <ActionIcon color="red" onClick={() =>{window.confirm( 'Are you sure?', ) && destroy(user.id)} }>
                            <AiOutlineDelete size={16} />
                        </ActionIcon>
                    </Group>
                ),
                },
            ]}

            totalRecords={records.length}
            recordsPerPage={PAGE_SIZE}
            page={page}
            onPageChange={(p) => setPage(p)}
        />
        );
    
  
}

