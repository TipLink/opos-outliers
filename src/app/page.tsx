import { CharacterDesign } from "@/components/character-design"

export default function Home() {
  return (
    <div className="min-h-screen p-3 w-full flex justify-center bg-cover bg-center bg-[url('/mobile-bg.jpg')] md:bg-[url('/bg.jpg')]">
        <div className="w-full max-w-3xl h-full">
            <CharacterDesign />
        </div>
    </div>
)
}
