import {Button} from "@nextui-org/react";
import NavBarLayout from "./components/NavBarLayout";

export default function Home() {
    return (
        <>
            <NavBarLayout />
            <div className="flex gap-4">
                <Button variant="bordered" radius="md">
                    Button
                </Button>
                <Button isDisabled color="primary" radius="md">
                    Disabled
                </Button>
                <Button variant="ghost" color="primary">Button</Button>
            </div>
        </>
     )
}
