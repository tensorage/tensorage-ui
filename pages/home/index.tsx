import Link from "next/link";
import { Button } from "rsuite";

export default function Home() {
  return (
    <div className="grid grid-cols-2 p-[10rem] gap-[10rem]">
      <div className="py-[1rem]">
        <div className="bg-green-light w-[5.875rem] h-[0.5rem] mb-[1.875rem]"></div>
        <div className="font-bold text-2xl text-dark mb-[1.875rem]">
          What is this website for?
        </div>
        <div className="text-dark-light mb-[1.875rem]">
          This website allows individuals and businesses to purchase
          Storage-subnet&apos;s Carbon Removal Credits (CCRCs). In addition, it
          provides a convenient interface for people to view the credits they
          own, along with the provenance and audit trail of those credits,
          building a high level of trust in the Storage-subnet&apos;s carbon
          removal process.
        </div>
        <Link href="/credit">
          <Button className="bg-green-light text-white p-[1rem] flex gap-2">
            What&apos;s Next?
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </Button>
        </Link>
      </div>
      <div className="shadow-[5px_10px_25px_rgba(0,0,0,0.15)] pl-[2rem] pr-[6.5rem] py-[3rem] rounded-xl">
        <div className="font-bold text-2xl text-dark mb-[1rem]">
          Buying Pre-CCRCs
        </div>
        <div className="bg-green-light w-[5.875rem] h-[0.25rem] mb-[1rem]"></div>
        <div className="text-dark-light mb-[1.875rem]">
          Buyers can commit to purchase CCRCs that will be generated in the
          future from Storage-subnet. This commitment helps us secure funding while
          buyers lock in their future supply and demonstrate their commitment to
          supporting long term carbon removal.
        </div>
      </div>
    </div>
  );
}
