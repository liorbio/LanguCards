import { CSSProperties } from "react";

export type CardType = { _id?: string, term: string, definition: string, pos: string, example: string, needsRevision: boolean, tags: string[], related: string, dialect: string, memorization: number };
export type PacketType = {  _id?: string, language: string, dir: "ltr" | "rtl" };
export type TransitionStyles = { entering: CSSProperties, entered: CSSProperties, exiting: CSSProperties, exited: CSSProperties, unmounted: CSSProperties };