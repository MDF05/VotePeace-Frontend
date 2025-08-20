import { Grid, Paper, Typography, Button, Box } from "@mui/material";
import RocketLauncherText from "./component/RocketLauncerText";
import TypographyVote from "./component/TypographyVote";
import HeroDescription from "./component/HeroDescription";
import ButtonComponent from "~/component/ButtonComponent";
import configColor from "~/color/configColor";
import TrustText from "./component/TrustText";
import FlexibleCard from "./component/FlexibleCard";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import InsightsIcon from "@mui/icons-material/Insights";

import WhyChooseVotePeace from "./component/TypographyChoose";
import FlexibleCardChoice from "./component/FlexibleCardChoice";
import CallToActionVoters from "./CallToActionVoters";

export default function HeroSection() {
  return (
    <Box>
      <Box
        display={"grid"}
        width={"full"}
        bgcolor={configColor.background}
        gridTemplateAreas={{
          xs: `"section1" "section2"`,
          md: `"section1 section2"`,
        }}
        gridTemplateColumns={"50% 50%"}
        justifyContent={"center"}
        alignContent={"center"}
        alignItems={"center"}
        height={"100vh"}
        padding={"100px"}
      >
        <Box gridArea={"section1"} gap={"10px"} display={"grid"}>
          <RocketLauncherText></RocketLauncherText>
          <TypographyVote></TypographyVote>
          <HeroDescription></HeroDescription>
          <Box display={"flex"} gap={"40px"}>
            <ButtonComponent
              backgroundComponent={configColor.colorYoungBlue1}
              backgroundHover={configColor.colorYoungBlue2}
            >
              Start Voting
            </ButtonComponent>
            <ButtonComponent
              backgroundComponent={configColor.tranparent}
              backgroundHover={configColor.colorYoungBlue1}
              border={`2px solid ${configColor.colorYoungBlue1}`}
            >
              View Voting
            </ButtonComponent>
          </Box>
          <Box display={"flex"} gap={"20px"} mt={"20px"}>
            <TrustText>End-to-End Ecryption</TrustText>
            <TrustText>Real Time Monitoring</TrustText>
          </Box>
        </Box>
        <Box gridArea={"section2"}>
          <Box
            component="img"
            src="/public/homepage-image.jpg"
            alt="Student Voting ilustration"
            borderRadius={"20px"}
          />
        </Box>
      </Box>
      <Box bgcolor={configColor.background2}>
        <Box
          display={"grid"}
          justifyContent={"center"}
          gap={"20px"}
          py={"50px"}
          gridTemplateColumns={"30% 30% 30%"}
        >
          <FlexibleCard
            changeColor="reat"
            icon={<GroupIcon></GroupIcon>}
            value={"20"}
            title="Total Voters"
            change="test"
          ></FlexibleCard>
          <FlexibleCard
            change="active"
            changeColor="reat"
            icon={<AssignmentTurnedInIcon></AssignmentTurnedInIcon>}
            value={"20"}
            title="Active Voters"
          ></FlexibleCard>
          <FlexibleCard
            change="participation"
            changeColor="reat"
            icon={<InsightsIcon></InsightsIcon>}
            value={"20%"}
            title="Participation"
          ></FlexibleCard>
        </Box>
        <Box>
          <WhyChooseVotePeace></WhyChooseVotePeace>
          <FlexibleCardChoice></FlexibleCardChoice>
        </Box>
        <Box p={"50px"}>
          <CallToActionVoters></CallToActionVoters>
        </Box>
      </Box>
    </Box>
  );
}
