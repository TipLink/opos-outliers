/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';

import { useCharacterDesign } from '@/hooks/use-character-design';

import { config } from '@/config';

type SelectorProps = {
    options: string[];
    label?: string;
    selectedIndex?: number;
    newAtrributes: string[];
    onChange: (idx: number) => void;
};

function ArrowSelector({
    options,
    label = "",
    selectedIndex = 0,
    onChange,
    newAtrributes
}: SelectorProps) {
    const [idx, setIdx] = useState<number>(0);
    const { setAttributeValue, attributeValuesMap } = useCharacterDesign();


    const prev = () => {
        setIdx(idx < 1 ? options.length - 1 : idx - 1);
    };

    const next = () => {
        setIdx(idx > options.length - 2 ? 0 : idx + 1);
    };

    useEffect(() => onChange(idx), [idx]);

    return (
        <div className="flex w-full items-center my-3" key={idx}>
            <button className="btn bg-secondary border-0" onClick={prev}>
                <img src="/leftA.png" alt="My Custom Button" style={{ width: '30px', height: '30px' }} />
            </button>
            <div className="flex-1 bg-magenta-200 text-center overflow-hidden">
                <div className="flex justify-center items-center">
                    <p className="text-xs whitespace-nowrap overflow-ellipsis text-white md:text-gray-200">{label}</p>
                    {newAtrributes.length && newAtrributes?.includes(attributeValuesMap[label]) ? (
                        <div className="badge badge-xs badge-primary font-bold p-1 ml-1">New</div>
                    ) : null}
                </div>
                <p className="whitespace-nowrap overflow-ellipsis text-white font-bold">{options[selectedIndex || idx]}</p>
            </div>
            <button className="btn bg-secondary border-0 relative" onClick={next}>
                <img src="/right.png" alt="My Custom Button" style={{ width: '30px', height: '30px' }} />
            </button>
        </div>
    );
}

const AttributesArrowSelector = ({ attributeName } : { attributeName : string }) => {
    const { setAttributeValue, attributeValuesMap } = useCharacterDesign();

    const options = Object.keys(config.attributes[attributeName]);
    const selectedIndex = options.indexOf(attributeValuesMap[attributeName]);

    const newAtrributes = config.newAttributes[attributeName] || [];

    return (
        <div className="font-space-mono flex" key={attributeName}>
            <ArrowSelector
                options={options}
                label={attributeName}
                selectedIndex={selectedIndex}
                newAtrributes={newAtrributes}
                onChange={(newAttributeValueIndex) => {
                    setAttributeValue(attributeName, options[newAttributeValueIndex]);
                }}
            />
        </div>
    );
}

export function AttributeSelector() {
    return (
        <div className="w-full">
            <div className="flex flex-col">
                <AttributesArrowSelector attributeName="Background" />
                <AttributesArrowSelector attributeName="Skin Color" />
                <AttributesArrowSelector attributeName="Head" />
                <AttributesArrowSelector attributeName="Face" />
                <AttributesArrowSelector attributeName="Torso" />
                <AttributesArrowSelector attributeName="Logo" />
                <AttributesArrowSelector attributeName="Legs" />
                <AttributesArrowSelector attributeName="Feet" />
            </div>
        </div>
    );
}