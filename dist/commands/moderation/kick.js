"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../..");
var Embeds_1 = __importDefault(require("../../constants/Embeds"));
var PunishmentModel_1 = __importDefault(require("../../db/model/PunishmentModel"));
var BaseCommand_1 = __importDefault(require("../../handlers/CommandHandler/BaseCommand"));
var ModerationLogger_1 = __importDefault(require("./@util/ModerationLogger"));
var KickCommand = /** @class */ (function (_super) {
    __extends(KickCommand, _super);
    function KickCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KickCommand.prototype.setup = function () {
        this.name = "Kick user";
        this.command = "kick";
        this.description = "Kick a user";
        this.usage = "kick <@user/userid> [reason]";
        this.permissions = "KICK_MEMBERS";
        this.category = "moderation";
    };
    KickCommand.prototype.run = function (_, args, msg) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var member, _e, reason, caseInfo;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!args[1])
                            return [2 /*return*/, msg.channel.send({ embeds: [Embeds_1.default.error("Usage: `" + __1.config.prefix + this.usage + "`")] })];
                        _e = ((_a = msg.mentions.members) === null || _a === void 0 ? void 0 : _a.first());
                        if (_e) return [3 /*break*/, 2];
                        return [4 /*yield*/, ((_b = msg.guild) === null || _b === void 0 ? void 0 : _b.members.fetch(args[0]))];
                    case 1:
                        _e = (_f.sent());
                        _f.label = 2;
                    case 2:
                        member = _e;
                        if (!member)
                            return [2 /*return*/, msg.channel.send({ embeds: [Embeds_1.default.warning('The specified member was not found in this guild.')] })];
                        reason = args.slice(1).join(' ') || "No reason specified";
                        return [4 /*yield*/, PunishmentModel_1.default.create({
                                action: 'kick',
                                issuer: msg.author.id,
                                member: member.id,
                                reason: reason,
                                guild: msg.guild.id
                            })];
                    case 3:
                        caseInfo = _f.sent();
                        ModerationLogger_1.default(msg.guild, caseInfo);
                        return [4 /*yield*/, member.send("You have been kicked from " + ((_c = msg.guild) === null || _c === void 0 ? void 0 : _c.name) + " (" + ((_d = msg.guild) === null || _d === void 0 ? void 0 : _d.id) + ") with the reason: " + reason)];
                    case 4:
                        _f.sent();
                        return [4 /*yield*/, member.kick()];
                    case 5:
                        _f.sent();
                        msg.channel.send("Successfully kicked **" + member.user.tag + "**");
                        return [2 /*return*/];
                }
            });
        });
    };
    return KickCommand;
}(BaseCommand_1.default));
exports.default = KickCommand;
