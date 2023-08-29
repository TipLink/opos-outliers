/* eslint-disable @next/next/no-img-element */
"use client";

import { ExternalLink } from "lucide-react";

import classNames from "classnames";

import { useEffect, useState, useMemo } from "react";

import { getRecentlyMinted } from "@/actions/recently-minted";
import { getMerkleTree } from "@/actions/merkle-tree";

import { Item, MerkleTree } from "@/types";
import { config } from "@/config";


import { NftDetailsModal } from "@/components/modals/nft-details";

function Minted({
    item,
    setShowDetails,
    setSelectedItem,
}: {
    item: Item,
    setShowDetails: (show: boolean) => void,
    setSelectedItem: (item: Item) => void,
}) {
    const [ selectedImage, setSelectedImage ] = useState<string>(item.image || "");

    const onEnter = () => {
        if(item.secondaryImage){
            setSelectedImage(item.secondaryImage)
        }
    }

    const handleClick = () => {
        setShowDetails(true);
        setSelectedItem(item);
    }

    return (
        <img
            onClick={handleClick}
            src={selectedImage}
            alt=""
            className="rounded cursor-pointer w-full aspect-square"
            onMouseEnter={onEnter}
            onMouseLeave={() => setSelectedImage(item.image)}
        />
    )
}

function Loader() {
    return (
        <>
            {Array(18).fill(1).map((_, index) => (
                <div key={index} className="animate-pulse bg-gray-300 aspect-square w-full rounded"></div>
            ))}
        </>
    )
}

export function RecentlyMinted() {
    const [ recentlyMinted, setRecentlyMinted ] = useState<Item[]>([]);
    const [ merkleTrees, setMerkleTrees ] = useState<MerkleTree[]>([]);
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ isLoadingMore, setIsLoadingMore ] = useState<boolean>(false);

    const fetchTrees = async () => {
        const result = await Promise.all(config.productionEnvironment.trees.map(getMerkleTree));

        setMerkleTrees(result);
    };

    const fetchRecent = async () => {
        setRecentlyMinted(await getRecentlyMinted(currentPage, Date.now()));
    }

    const loadMore = async () => {
        setIsLoadingMore(true);

        try {
            const result = await getRecentlyMinted(currentPage + 1, Date.now());
    
            if(result.length) {
                setRecentlyMinted([...recentlyMinted, ...result]);
        
                setCurrentPage(currentPage + 1);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoadingMore(false);
        }

    }    

    useEffect(() => {
        if(!recentlyMinted.length) {
            fetchRecent();
        }

        if(!merkleTrees.length) {
            fetchTrees();
        }
    }, []);

    const totalCount = useMemo(() => {
        return merkleTrees.reduce((acc, tree) => acc + tree?.rightMostIndex, 0);
    }, [merkleTrees]);

    const [ showDetails, setShowDetails ] = useState<boolean>(false);
    const [ selectedItem, setSelectedItem ] = useState<Item>();

    console.log({
        showDetails,
        selectedItem
    })

    return (
        <>
            <div className="w-full glass p-4 rounded-xl mt-8 md:mt-0">
                {recentlyMinted.length ? (
                    <div className="flex flex-wrap items-center justify-between">
                        <h3 className="text-xl text-gray-800 font-bold font-space-mono mb-3 m-h-20">Recently Minted</h3>

                        <div>
                            <p className="text-xs text-gray-900">Total Minted</p>
                            <h3 className="text-sm text-gray-800 font-bold font-space-mono mb-3 m-h-20">
                                {totalCount} / ∞
                            </h3>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-between flex-wrap items-center mb-4">
                        <div className="animate-pulse bg-gray-300 w-[20%] py-2 rounded"></div>
                        <div className="animate-pulse bg-gray-300 w-[5%] py-1 rounded"></div>
                    </div>
                )}

                <div className="grid grid-cols-5 md:grid-cols-9 gap-3">
                    {recentlyMinted.length ? recentlyMinted.map((item, index) => (
                        <Minted
                            key={index}
                            item={item}
                            setShowDetails={setShowDetails}
                            setSelectedItem={setSelectedItem}
                        />
                    )) : <Loader />}

                    <button
                        onClick={loadMore}
                        className={classNames({
                            "btn btn-secondary h-full": true,
                            "loading": isLoadingMore,
                        })}
                    >Load More</button>
                </div>
            </div>
            <NftDetailsModal
                item={selectedItem}
                show={showDetails}
                close={() => setShowDetails(false)}
            >   
                <a
                    className="btn btn-primary w-full"
                    href={`https://xray.helius.xyz/token/${selectedItem?.id}`}>
                    View on Explorer
                    <ExternalLink size={16} />
                </a>
            </NftDetailsModal>
        </>
    )
}