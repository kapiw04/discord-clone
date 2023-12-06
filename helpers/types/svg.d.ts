declare module "*.svg" {
  import type React from "react";

  // idk it works
  export default React.FC<React.SVGProps<SVGSVGElement>>();
}
