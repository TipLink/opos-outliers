"use client"

import { useEffect, useState } from "react";

import { getMerkleTree } from "@/actions/merkle-tree";
import { getAccountInfo } from "@/actions/account";

import type { Account } from "@/types";

import { config } from "@/config";

function TreeStats(props: { address: string }) {
    const [ merkleTree, setMerkleTree ] = useState<any>();

    const fetchTrees = async () => {
        const result = await getMerkleTree(props.address);

        setMerkleTree(result);
    };

    useEffect(() => {
        fetchTrees();
    }, []);

    return (
        <div className="glass p-5 rounded mb-5">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Tree</h2>
                {config.productionEnvironment.activeTree === props.address && (
                    <div className="badge badge-accent">Active</div>
                )}
            </div>

            <a className="text-xs link" href={"https://xray.helius.xyz/account/" + props.address + "/concurrent-merkle-tree"}>{props.address}</a>

            <div className="grid grid-cols-3 my-5">
                <div>
                    <p className="font-bold text-xs">Used Leaves</p>
                    <p className="font-bold text-md">
                        {merkleTree?.rightMostIndex.toLocaleString() || "..."}
                    </p>
                </div>
                <div>
                    <p className="font-bold text-xs">Maximum Leaves</p>
                    <p className="font-bold text-md">{Math.pow(2, merkleTree?.treeHeight).toLocaleString() || "..."}</p>
                </div>
                <div>
                    <p className="font-bold text-xs">Remaining Leaves</p>
                    <p className="font-bold text-md">{(Math.pow(2, merkleTree?.treeHeight) - merkleTree?.rightMostIndex).toLocaleString() || "..."}</p>
                </div>
            </div>

            <p className="text-xs">
                {((merkleTree?.rightMostIndex / Math.pow(2, merkleTree?.treeHeight)) * 100).toLocaleString()}%
            </p>
            <progress
                className="progress progress-success w-full"
                value={merkleTree?.rightMostIndex}
                max={Math.pow(2, merkleTree?.treeHeight) || 0}
            />
        </div>
    );
}

function PayerStats () {
    const [ payerAccount, setPayerAccount ] = useState<Account>();

    const fetchPayerAccount = async () => {
        const result = await getAccountInfo(config.productionEnvironment.payer);

        setPayerAccount(result);
    };

    useEffect(() => {
        fetchPayerAccount();
    }, []);

    return (
        <div className="glass p-5 rounded mb-5">
            <h2 className="text-2xl font-bold">Payer</h2>
            <a className="text-xs link" target="_blank" href={"https://xray.helius.xyz/account/" + payerAccount?.address}>{payerAccount?.address}</a>
            <div className="mt-5">
                <p className="font-bold text-xs">Balance</p>
                <p className="font-bold text-md">{payerAccount?.balance || "..."}</p>
            </div>
        </div>
    );
}

export default function Admin() {

    return (
        <div className="container mx-auto min-h-[95vh]">
            <div className="mx-auto max-w-xl py-5">
                <h1 className="text-4xl font-bold text-center py-4">Admin Panel</h1>
                {config.productionEnvironment.trees.map((tree, index) => (
                    <TreeStats key={index} address={tree} />
                ))}

                <PayerStats />
            </div>
        </div>
    )
}