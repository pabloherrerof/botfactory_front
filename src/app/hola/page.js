'use client'
import React, { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import { toastError } from '@/lib/notifications'

const Dashboard = () => {
    const [campaigns, setCampaigns] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('') // Estado para manejar mensajes de error
    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.defaults.withCredentials = true
                const response = await axios.get(`/api/clients?name=Remington`)
                setCampaigns(response.data)
            } catch (error) {
                setError(
                    'No pudimos encontrar información. Pruebe de nuevo más tarde.',
                )
                toastError('Error del servidor. Intente de nuevo más tarde.')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    console.log(campaigns)

    return (
        <>
        
        </>
    )
}

export default Dashboard
