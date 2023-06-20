import { Text, ActionIcon, Group } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { Component, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import axios from '../../config/axios';

const PAGE_SIZE = 10;
// KANKA BUNUN SHOW VE STOCK SIKINTILI
export default function CityTable(props) {
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("/cities/list")
            let cities = res.data
            cities.sort(function(a, b) {
                var keyA = new Date(a.createdAt),
                  keyB = new Date(b.createdAt);
                // Compare the 2 dates
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
              });
            if (res)
                setRecords(cities.slice(0, PAGE_SIZE))
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
            id: id
        }
        const res = await axios.put("/cities/delete",data)
        if (res)
            window.location.href = "/cities"
    }


    const edit = (id) => {
        props.setClickedCityId(id)
        props.setModalCityEdit(true)
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
                accessor: 'name',
                textAlignment: 'center'
            },
            { 
                accessor: 'startPrice',
                textAlignment: 'center'
            },
            { 
                accessor: 'perKmPrice',
                textAlignment: 'center'
            },
            {
                accessor: 'actions',
                title: <Text mr="xs">Row actions</Text>,
                textAlignment: 'center',
                width: 150,
                render: (city) => (
                    <Group spacing={4} position="center" noWrap>
                        <ActionIcon color="yellow" onClick={() =>{edit(city.id)} }>
                            <AiOutlineEdit size={16} /> 
                        </ActionIcon>
                        <ActionIcon color="red" onClick={() =>{window.confirm( 'Are you sure?', ) && destroy(city.id)} }>
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

