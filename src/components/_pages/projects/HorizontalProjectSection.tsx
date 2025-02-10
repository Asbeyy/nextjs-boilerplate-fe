import Tag from '@/components/tags/Tag'
import Title from '@/components/titles/Title'
import { ProjectModel } from '@/models/ProjectModel'
import Link from 'next/link'
import React, { useEffect } from 'react'


interface HorizontalProjectSectionProps {
    category?: string
    projects?: ProjectModel[]
}

function HorizontalProjectSection({ category, projects }: HorizontalProjectSectionProps) {




    return (
        <div className='w-[100%] flex flex-col' style={{
            maxWidth: '100%', // Ensure horizontal scroll
        }}>
            <Title
                subtitle={!category || category === '' ? `All Projects (${ projects && projects.length})` : `${category} Projects (${ projects && projects.length})`}
            />

            <div
                className="h-[200px] w-full flex gap-2"
                style={{
                    overflowX: 'scroll',
                    flexWrap: 'nowrap', // Ensure inline horizontal layout
                    whiteSpace: 'nowrap', // Ensure inline horizontal layout
                    scrollbarWidth: 'none', // Hide scrollbar for Firefox
                    msOverflowStyle: 'none', // Hide scrollbar for IE and Edge
                }}
            >
                {
                    category &&
                    projects?.filter((project) => project.category === category).map((project) => (
                        <Link
                            key={project._id}
                            href={'/dashboard/projects/${'}
                            className="h-1/1 w-1/4 bg-red-500 rounded-md p-2 flex flex-col justify-between cursor-pointer"
                            style={{
                                position: 'relative',
                                flexShrink: 0, // Prevent cards from shrinking
                            }}
                        >
                            <img
                                src="/backgrounds/banner_0.svg"
                                alt="banner"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    height: '100%',
                                    width: '100%',
                                    borderRadius: '5px',
                                    objectFit: 'cover',
                                }}
                            />
                            <div className="w-[100px] z-10">
                                <Tag
                                    text={project.category}
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        display: 'flex',
                                    }}
                                />
                            </div>
                            <p className="z-10">
                                {project.info.name}
                            </p>
                        </Link>
                    ))
                }
                {
                    !category &&
                    projects?.filter((project) => project.category === category).map((project) => (
                        <Link
                            key={project._id}
                            href={`/dashboard/projects/${project._id}`}
                            className="h-1/1 w-1/4 bg-red-500 rounded-md p-2 flex flex-col justify-between cursor-pointer"
                            style={{
                                position: 'relative',
                                
                                flexShrink: 0, // Prevent cards from shrinking
                            }}
                        >
                            <img
                                src="/backgrounds/banner_0.svg"
                                alt="banner"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    height: '100%',
                                    width: '100%',
                                    borderRadius: '5px',
                                    objectFit: 'cover',
                                }}
                            />
                            <div className="w-[100px] z-10">
                                <Tag
                                    text={'Global'}
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        display: 'flex',
                                    }}
                                />
                            </div>
                            <p className="z-10">
                                {project.info.name}
                            </p>
                        </Link>
                    ))
                }
            </div>

        </div>
    )
}

export default HorizontalProjectSection