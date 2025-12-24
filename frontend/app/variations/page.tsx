"use client"

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react'
import axios from 'axios';
import Markdown from 'react-markdown';

interface AnalysisData {
    analysis: string;
    variations: string[];
}

const IdeaAnalysisPage: React.FC = () => {
    const [data, setData] = useState<AnalysisData | null>(null);
    const [, setLoading] = useState<boolean>(false);

    useEffect(() => {
        // Get data from localStorage when component mounts
        const storedData = localStorage.getItem('ideaAnalysisData');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                console.log(parsedData);
                setData(parsedData);
            } catch (error) {
                console.error("Error parsing data from localStorage:", error);
            }
        }
    }, []);

    const handleVariationClick = async (index: number) => {
        const variation = data?.variations?.[index];

        if (!variation) return;

        console.log('Selected variation:', variation);

        const colonIndex = variation.indexOf(':');
        const title = colonIndex !== -1 ? variation.substring(0, colonIndex).trim() : `Variation ${index + 1}`;
        const description = colonIndex !== -1 ? variation.substring(colonIndex + 1).trim() : variation;

        const project = {
            name: title,
            nodes: [{
                id: 'node_1',
                title: 'Strategic Analysis',
                data: { label: data.analysis, prompt: 'analysis' },
                position: { x: 0, y: 0 },
            }, {
                id: 'node_2',
                title: title,
                data: { label: description, prompt: `variation ${index + 1}` },
                position: { x: 100, y: 100 },
            },],
            edges: [{
                id: 'edge_1_2',
                source: 'node_1',
                target: 'node_2',
            }],
            // categorization: {
            //     type: '',
            //     market: '',
            //     target: '',
            //     main_competitors: '',
            //     trendAnalysis: '',
            // },
            // projectRating: {
            //     opportunity: 0,
            //     problem: 0,
            //     feasibility: 0,
            //     why_now: 0,
            //     feedback: '',
            // },
        };

        console.log('Project:', project);
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/project`, project, { withCredentials: true });
            if (response?.data) {
                window.location.href = `/graph/${response.data._id}`;
                console.log('Response:', response.data);
            }
            setLoading(false);
        }
        catch (error: unknown) {
            const errorData = error instanceof Error
                ? { message: error.message }
                : axios.isAxiosError(error) && error.response
                    ? error.response.data
                    : { message: 'An unknown error occurred' };
            console.log(JSON.stringify(errorData, null, 2));
            setLoading(false);
        }
        console.log('end');

    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Idea Analysis</h1>
                    <p className="text-gray-600">Review your strategic analysis and explore variations</p>
                </div>

                {/* Analysis Section */}
                <div className="mb-12">
                    <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Strategic Analysis</h2>
                        <div className="prose prose-lg max-w-none text-gray-700">
                            {data?.analysis ? (
                                <Markdown>
                                    {data.analysis}
                                </Markdown>
                            ) : (
                                <p className="text-gray-500">No analysis available</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Variations Section */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Idea Variations</h2>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {data?.variations && data.variations.length > 0 ? (
                            data.variations.map((variation: string, index: number) => {
                                const colonIndex = variation.indexOf(':');
                                const title = colonIndex !== -1 ? variation.substring(0, colonIndex).trim() : `Variation ${index + 1}`;
                                const description = colonIndex !== -1 ? variation.substring(colonIndex + 1).trim() : variation;

                                return (
                                    <div
                                        key={index}
                                        onClick={() => handleVariationClick(index)}
                                        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-gray-300 group"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {title}
                                            </h3>
                                            <ArrowRight className="w-5 h-5 text-gray-400 transform transition-transform group-hover:translate-x-1 group-hover:text-gray-600" />
                                        </div>

                                        <div className="prose prose-sm max-w-none text-gray-700">
                                            <Markdown>
                                                {description}
                                            </Markdown>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-gray-500 text-center col-span-full">No variations available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdeaAnalysisPage;