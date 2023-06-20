import { Text, ActionIcon, Group } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { Component, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { TiTick } from "react-icons/ti"
import { ImCross } from "react-icons/im"
import axios from '../../config/axios';

const PAGE_SIZE = 10;
// KANKA BUNUN SHOW VE STOCK SIKINTILI
export default function StoreTravel(props) {
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState([]);
    const [update, setUpdate] = useState(false)
    const [travel, setTravel] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("/userTravels/list")
            let travels = res.data
            travels.map(async (travel)=>{
                travel.statusName = travel.status === 0 ? 'Waiting for permission' : travel.status === 1 ? 'Accepted' : travel.status === 2 ? 'Travel completed successfully' : travel.status === 3 ? 'Travel is suspicious' : 'Denied'
                if (travel.resultData[0]?.receiptPrice) {
                    if (travel.resultData[0]?.receiptPrice.includes(',')) {
                        travel.resultData[0].receiptPrice = parseInt((travel.resultData[0]?.receiptPrice.split(','))[0])
                      }
                      else if (travel.resultData[0]?.receiptPrice.includes('.')) {
                        travel.resultData[0].receiptPrice = parseInt((travel.resultData[0]?.receiptPrice.split('.'))[0]) // 127.40 - 127
                      }
                      else {
                        travel.resultData[0].receiptPrice = parseInt(travel.resultData[0]?.receiptPrice)
                      }
                }
                
            })
            travels.sort(function(a, b) {
                var keyA = new Date(a.createdAt),
                  keyB = new Date(b.createdAt);
                // Compare the 2 dates
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
              });
              setTravel(travels)
              const from = (page - 1) * PAGE_SIZE;
              const to = from + PAGE_SIZE;
              setRecords(travels.slice(from, to));

        }
        fetchData();
    }, [update, page]);


      const show = (image) => {
        props.setImage(image)
        props.setModalTravelShow(true)
    }

    const approve = async (id) => {
        const res = await axios.put(`/userTravels/update`, {
            id: String(id),
            status: '1'
        })
        if (res.status === 200)
            setUpdate(true)
    }

    const deny = async (id) => {
        const res = await axios.put(`/userTravels/update`, {
            id: String(id),
            status: '4'
        })
        if (res.status === 200)
            setUpdate(true)
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
                accessor: 'userData[0].username',
                title: 'Username',
                textAlignment: 'center'
            },
            {
                accessor: 'cityData[0].name',
                title: 'Start City Name',
                textAlignment: 'center'
            },
            {
                accessor: 'address',
                title: 'Address',
                textAlignment: 'center'
            },
            {
                accessor: 'statusName',
                title: 'Status',
                textAlignment: 'center'
            },
            {
                accessor: 'resultData[0].estimatedPrice',
                title: 'Estimated Price',
                textAlignment: 'center'
            },
            {
                accessor: 'resultData[0].receiptPrice',
                title: 'OCR Price',
                textAlignment: 'center'
            },
            {
                accessor: 'actions',
                title: <Text mr="xs">Row actions</Text>,
                textAlignment: 'center',
                width: 150,
                render: (travel) => (
                    travel.status === 0 ?
                    <Group spacing={4} position="center" noWrap>
                        <ActionIcon color="green">
                            <TiTick size={24} onClick={() => approve(travel.id)} /> 
                        </ActionIcon>
                        <ActionIcon color="red" onClick={() =>{deny(travel.id)} }>
                            <ImCross size={12} /> 
                        </ActionIcon>
                    </Group>

                    :
                    travel.status === 2 || travel.status === 3 ?
                    <Group spacing={4} position="center" noWrap>
                        <ActionIcon color="blue">
                                <AiOutlineEye size={16} onClick={() => show(travel?.resultData[0]?.receipt)} /> 
                        </ActionIcon>
                    </Group>
                    :
                    <div>
                        -
                    </div>
               
                ),
                },
            ]}

            totalRecords={travel.length}
            recordsPerPage={PAGE_SIZE}
            page={page}
            onPageChange={(p) => setPage(p)}
        />
        );
    
  
}

