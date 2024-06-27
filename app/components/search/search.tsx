import { commandIcon } from "@/app/utils/icons";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

export default function Search() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border inline-flex items-center justify-center text-sm"
        >
          <p className="text-sm text-muted-foreground">Search Here...</p>
          <div className="command dark:bg-[#262626] bg-slate-200  py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
            {commandIcon}
            <span className="text-[9px]">F</span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0">
        <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search a city..." />
            <CommandGroup heading="Suggestions">
            </CommandGroup>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
