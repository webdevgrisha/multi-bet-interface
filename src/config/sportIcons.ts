import { SVG_AmericanFootball, SVG_AussieRules, SVG_Baseball, SVG_Basketball, SVG_Boxing, SVG_Cricket, SVG_IceHockey, SVG_Lacrosse, SVG_MixedMartialArts, SVG_RugbyLeague, SVG_Soccer } from "../assets"
import type { GroupName } from '../types/types';

type SportIcons = {
    [key in GroupName]: React.ComponentType;
}

const sportIcons: SportIcons = {
    "American Football": SVG_AmericanFootball,
    "Soccer": SVG_Soccer,
    "Boxing": SVG_Boxing,
    "Mixed Martial Arts": SVG_MixedMartialArts,
    "Baseball": SVG_Baseball,
    "Basketball": SVG_Basketball,
    "Ice Hockey": SVG_IceHockey,
    "Rugby League": SVG_RugbyLeague,
    "Aussie Rules": SVG_AussieRules,
    "Cricket": SVG_Cricket,
    "Lacrosse": SVG_Lacrosse,
}

export {
    sportIcons
}