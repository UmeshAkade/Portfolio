import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import SectionWrapper from "./SectionWrapper";

const CallToAction = () => {
  const { theme } = useTheme();

  return (
    <SectionWrapper id='cta' className=''>
      <></>
    </SectionWrapper>
  );
};

export default CallToAction;
